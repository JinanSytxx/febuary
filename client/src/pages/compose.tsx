import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertConfessionSchema, type InsertConfession } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import FloatingHearts from "@/components/animations/FloatingHearts";
import TextReveal from "@/components/animations/TextReveal";

export default function Compose() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showHearts, setShowHearts] = useState(false);

  const form = useForm<InsertConfession>({
    resolver: zodResolver(insertConfessionSchema),
    defaultValues: {
      message: "",
      senderName: "",
      recipientName: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertConfession) => {
      const res = await apiRequest("POST", "/api/confessions", data);
      return res.json();
    },
    onSuccess: (data) => {
      setShowHearts(true);
      setTimeout(() => {
        setLocation(`/view/${data.id}`);
      }, 2000);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send your confession. Please try again.",
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-12 px-4">
      {showHearts && <FloatingHearts />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <Card className="shadow-lg border-pink-200">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-600 text-transparent bg-clip-text">
              <TextReveal text="Express Your Love" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input placeholder="Their name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your heartfelt message..."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-600 hover:from-rose-500 hover:to-pink-700"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sending..." : "Send Your Love"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
