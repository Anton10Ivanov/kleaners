
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ClientQuestion } from "./types";
import { useToast } from "@/components/ui/use-toast";

export const useCustomerQuestions = () => {
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("client_questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setQuestions(data || []);
    } catch (error: any) {
      console.error("Error fetching client questions:", error.message);
      toast({
        variant: "destructive",
        title: "Error fetching questions",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mark question as answered
  const markAsAnswered = async (id: string) => {
    try {
      const { error } = await supabase
        .from("client_questions")
        .update({ status: "answered" })
        .eq("id", id);

      if (error) {
        throw error;
      }

      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: "answered" } : q))
      );

      toast({
        title: "Success",
        description: "Question marked as answered",
      });
    } catch (error: any) {
      console.error("Error updating question:", error.message);
      toast({
        variant: "destructive",
        title: "Error updating question",
        description: error.message,
      });
    }
  };

  // Mark question as ignored
  const markAsIgnored = async (id: string) => {
    try {
      const { error } = await supabase
        .from("client_questions")
        .update({ status: "ignored" })
        .eq("id", id);

      if (error) {
        throw error;
      }

      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: "ignored" } : q))
      );

      toast({
        title: "Success",
        description: "Question marked as ignored",
      });
    } catch (error: any) {
      console.error("Error updating question:", error.message);
      toast({
        variant: "destructive",
        title: "Error updating question",
        description: error.message,
      });
    }
  };

  // Mark question as spam
  const markAsSpam = async (id: string) => {
    try {
      const { error } = await supabase
        .from("client_questions")
        .update({ is_spam: true, status: "spam" })
        .eq("id", id);

      if (error) {
        throw error;
      }

      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, is_spam: true, status: "spam" } : q))
      );

      toast({
        title: "Success",
        description: "Question marked as spam",
      });
    } catch (error: any) {
      console.error("Error updating question:", error.message);
      toast({
        variant: "destructive",
        title: "Error updating question",
        description: error.message,
      });
    }
  };

  // Delete question
  const deleteQuestion = async (id: string) => {
    try {
      const { error } = await supabase
        .from("client_questions")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setQuestions((prev) => prev.filter((q) => q.id !== id));

      toast({
        title: "Success",
        description: "Question deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting question:", error.message);
      toast({
        variant: "destructive",
        title: "Error deleting question",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    fetchQuestions();

    // Set up real-time subscription for client_questions table
    const questionSubscription = supabase
      .channel("client_questions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "client_questions",
        },
        () => {
          fetchQuestions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(questionSubscription);
    };
  }, []);

  return {
    questions,
    isLoading,
    markAsAnswered,
    markAsIgnored,
    markAsSpam,
    deleteQuestion,
  };
};
