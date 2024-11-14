import React, { useState } from 'react';
import { MessageCircleIcon, HelpCircleIcon, XIcon, SendIcon } from 'lucide-react';
import { getAIExplanation, askFollowUpQuestion } from '../lib/xai';
import { toast } from 'react-hot-toast';

interface AIExplanationProps {
  topic: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AIExplanation: React.FC<AIExplanationProps> = ({
  topic,
  isOpen,
  onClose,
}) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [followUpAnswer, setFollowUpAnswer] = useState('');
  const [showFollowUp, setShowFollowUp] = useState(false);

  const fetchExplanation = async () => {
    setLoading(true);
    try {
      const result = await getAIExplanation(topic);
      setExplanation(result);
    } catch (error) {
      toast.error('Unable to get AI explanation at this time');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!followUpQuestion.trim()) return;

    setLoading(true);
    try {
      const answer = await askFollowUpQuestion(followUpQuestion);
      setFollowUpAnswer(answer);
      setFollowUpQuestion('');
    } catch (error) {
      toast.error('Unable to get answer at this time');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && !explanation) {
      fetchExplanation();
    }
  }, [isOpen, topic]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircleIcon className="w-5 h-5 text-blue-500" />
            AI Explanation
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="prose max-w-none">
                <h4 className="text-lg font-medium text-gray-900">About: {topic}</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{explanation}</p>
              </div>

              {followUpAnswer && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Answer:</h5>
                  <p className="text-gray-700">{followUpAnswer}</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-4 border-t">
          {!showFollowUp ? (
            <button
              onClick={() => setShowFollowUp(true)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
            >
              <HelpCircleIcon className="w-5 h-5" />
              Ask a follow-up question
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
              />
              <button
                onClick={handleAskQuestion}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};