import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import TextReveal from "@/components/animations/TextReveal";
import { useToast } from "@/hooks/use-toast";

export default function View({ params }: { params: { id: string } }) {
  const { toast } = useToast();

  const { data: confession, isLoading } = useQuery({
    queryKey: ["/api/confessions", params.id],
  });

  const shareConfession = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this confession with others",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-pink-400" />
        </div>
      </div>
    );
  }

  if (!confession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Confession not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <Card className="shadow-lg border-pink-200">
          <CardHeader>
            <div className="space-y-2">
              <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-600 text-transparent bg-clip-text">
                <TextReveal text="A Love Confession" />
              </CardTitle>
              <p className="text-center text-sm text-gray-500">
                <TextReveal text="kamu mau gk jadi pacar aku?" />
              </p>
              <p className="text-center text-xs text-gray-400 mt-2">
                <TextReveal text="WAJIB BACA SEBELUM JAWAB :) maap kalo confess nya sederhana gak kayak orang² ngasih buket bunga atau coklat,karna aku cmn bisa buat kek gini aja hehe,aku harap kamu mau terima:)" />
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">To</p>
              <p className="text-xl font-semibold text-gray-900">{confession.recipientName}</p>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-inner"
              >
                <p className="text-gray-800 whitespace-pre-wrap">{confession.message}</p>
              </motion.div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-2">From</p>
              <p className="text-xl font-semibold text-gray-900">{confession.senderName}</p>
            </div>
            <Button
              onClick={shareConfession}
              className="w-full bg-gradient-to-r from-rose-400 to-pink-600 hover:from-rose-500 hover:to-pink-700"
            >
              Share This Confession
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}