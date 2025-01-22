"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddQuestionForm } from "@/components/student/AddQuestionForm";
import { QuestionCard } from "@/components/student/QuestionCard";
import { QuestionCardSkeleton } from "@/components/student/QuestionCardSkeleton";
import { useUserContext } from "@/context/AppContext";
import { DownloadPopup } from "@/components/student/DownloadPopup";
import { PDFQuestionCard } from "@/components/student/PDFQuestionCard";

interface Question {
  _id?: string;
  company: string;
  questions: string[];
  studentName: string;
  review: string;
  createdAt: string;
}

export default function Page() {
  const { studentData } = useUserContext()

  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/get-company-questions");
        if (response.data.success) {
          setQuestions(response.data.questions);
        } else {
          console.error("Failed to fetch questions:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const addQuestion = async (newQuestion: Omit<Question, '_id' | 'studentName' | 'createdAt'>) => {
    if (loading) return;

    setLoading(true);
    try {
      const studentName = `${studentData?.firstName} ${studentData?.lastName}`;
    
      const response = await axios.post("/api/add-company-questions", {
        ...newQuestion,
        studentName,
      });

      if (response.data.success && response.data.question) {
        setQuestions((prevQuestions) => [...prevQuestions, response.data.question]);
        setShowForm(false);
      } else if (response.data.message === "Duplicate question entry") {
        console.warn("This question already exists. Not adding duplicate.");
        setShowForm(false);
      } else {
        console.error("Failed to add question:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding question:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions.filter((q) =>
    q.company.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDownload = async (selectedCompanies: string[]) => {
    setDownloadLoading(true);
    const selectedQuestions = questions.filter(q => selectedCompanies.includes(q.company));
    const pdfGenerator = new PDFQuestionCard();
    const pdf = pdfGenerator.generatePDF(selectedQuestions);
    pdf.save("company_questions.pdf");
    setDownloadLoading(false);
    setShowDownloadPopup(false);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen mb-10">
      <section className="relative py-10">
        <div className="mb-4 mt-2">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-[#244855]">
            Company Questions
          </h4>
          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-[#90AEAD] text-center font-normal">
            Search company-specific questions faced by students during interviews.
          </p>
        </div>
      </section>

      <div className="flex justify-between items-center mb-6">
        <div className="relative mb-6">
          <Input
            className="pl-10 pr-4 py-2 border-gray-300 rounded-lg shadow-sm"
            placeholder="Filter by company name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="space-x-2">
          <Button onClick={() => setShowForm(true)} className="bg-[#E64833] hover:bg-[#C93C2B]">
            Add Questions
          </Button>
          <Button onClick={() => setShowDownloadPopup(true)} className="bg-[#244855] hover:bg-[#1A3640]">
            Download Questions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(0,auto)]">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <QuestionCardSkeleton key={index} />
          ))
        ) : filteredQuestions.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No questions available.</p>
        ) : (
          filteredQuestions.map((q) => (
            <QuestionCard key={q._id || `${q.company}-${q.studentName}`} question={q} />
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <AddQuestionForm onSubmit={addQuestion} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {showDownloadPopup && (
        <DownloadPopup
          companies={Array.from(new Set(questions.map(q => q.company)))}
          onDownload={handleDownload}
          onClose={() => setShowDownloadPopup(false)}
          loading={downloadLoading}
        />
      )}
    </div>
  );
}

