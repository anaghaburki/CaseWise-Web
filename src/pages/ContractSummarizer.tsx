import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-markdown";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const documentPrompt = `Analyze the following legal document and extract all key information that a user should know, including terms, obligations, conditions, and potential risks. Highlight any clauses or terms that could be unfavorable, hidden, or misleading, and flag them as 'concerning' or 'shady' if applicable. Summarize the key takeaways clearly and list any specific actions the user should take
        
        Return the response the following JSON response WITHOUT ANY PARSING OR SYNTAX ERRORS 

        {
          \"document_name\": \"\",
          \"document_type\": \"\",
          \"parties_involved\": [],
          \"effective_date\": \"\",
          \"termination_date\": \"\",
          \"key_terms\": {
            \"description\": \"\",
            \"terms\": [
              {
                \"term\": \"\",
                \"importance\": \"\"
              }
            ]
          },
          \"obligations\": [
            {
              \"obligation\": \"\",
              \"description\": \"\",
              \"due_date\": null
            }
          ],
          \"risks\": {
            \"general\": [
              {
                \"risk\": \"\",
                \"impact\": \"\",
                \"likelihood\": \"\",
                \"concerning\": false
              }
            ],
            \"legal\": [],
            \"financial\": [],
            \"reputational\": []
          },
          \"shady_clauses\": [
            {
              \"clause\": \"\",
              \"description\": \"\",
              \"reason\": \"\",
              \"potential_impact\": \"\"
            }
          ],
          \"action_items\": [
            {
              \"action\": \"\",
              \"deadline\": null
            }
          ],
          \"dispute_resolution\": {
            \"method\": \"\",
            \"jurisdiction\": \"\"
          },
          \"termination_conditions\": [],
          \"review_recommendations\": \"\",
          \"user_protection_tips\": \"\",
          \"overall_analysis\": \"\"
        }
        `;

function ContractSummarizer() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [summary, setSummary] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
            setSummary(null);
            setError(null);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const analyzeDocument = async () => {
        if (!pdfFile) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            const pdfData = event.target?.result as string;
            await sendPdfForAnalysis(pdfData);
        };
        reader.readAsDataURL(pdfFile);
    };

    const sendPdfForAnalysis = async (pdfData: string) => {
        const prompt = `${documentPrompt}\n\nPDF Content: ${pdfData}`;
        setLoading(true);

        try {
            const result = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
                .startChat()
                .sendMessage(prompt);

            const modelResponse = result.response.text();
            setSummary(modelResponse);
            setError(null);
        } catch (error) {
            console.error("Error analyzing PDF:", error);
            setError("There was an error processing the document. Please try again.");
            setSummary(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-100 p-4">
            <div className="w-full max-w-xl">
                <h1 className="text-2xl font-semibold mb-4">Contract Summarizer</h1>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    className="mb-4 border border-gray-300 p-2 rounded-lg" />
                <button
                    onClick={analyzeDocument}
                    disabled={!pdfFile || loading}
                    className={`mt-2 px-4 py-2 rounded-lg ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                >
                    {loading ? "Analyzing..." : "Analyze"}
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                {summary && (
                    <div className="bg-white shadow-lg rounded-lg p-6 h-96 overflow-y-auto mt-4">
                        <h2 className="text-xl font-bold mb-2">Summary:</h2>
                        <Markdown>{summary}</Markdown>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContractSummarizer;
