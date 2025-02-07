import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/animations/FloatingHearts";
import TextReveal from "@/components/animations/TextReveal";

export default function Compose() {
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const noButtonControls = useAnimation();
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/seandainya.mp3');
    audio.loop = true;

    // Play audio when component mounts
    const playAudio = async () => {
      try {
        audio.currentTime = 114; // Start at 1:54
        await audio.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    };

    playAudio();
    setAudioElement(audio);

    // Cleanup function to stop audio when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleMouseMove = async (e: React.MouseEvent) => {
    if (!showSuccess) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newX = x < rect.width / 2 ? 100 : -100;
      const newY = y < rect.height / 2 ? 50 : -50;
      await noButtonControls.start({
        x: newX,
        y: newY,
        transition: { type: "spring", bounce: 0.5 }
      });
    }
  };

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  const confessionSteps = [
    {
      title: "Hay kamu...",
      content: "Aku punya sesuatu yang ingin aku sampaikan",
    },
    {
      title: "Kamu tau ga?",
      content: "Setiap kali aku melihatmu, jantungku berdebar lebih kencang...",
    },
    {
      title: "Dan...",
      content: "Setiap hari yang kulalui terasa lebih indah karena ada kamu",
    },
    {
      title: "Sejujurnya...",
      content: "Aku sudah lama memendam perasaan ini untukmu",
    },
  ];

  const renderContent = () => {
    if (showSuccess) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-pink-600 text-transparent bg-clip-text">
            <TextReveal text="I Love You! ❤️" />
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Terima kasih sudah menerima cintaku. Aku berjanji akan selalu:
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <img 
              src="/surprise.jpg" 
              alt="Surprise"
              className="rounded-2xl mx-auto shadow-lg max-w-[250px] mb-6" 
            />
          </motion.div>

          <ul className="text-left text-gray-600 space-y-2 mb-6">
            <li>💝 Menyayangimu sepenuh hati</li>
            <li>💫 Menjadi yang terbaik untukmu</li>
            <li>🌟 Membahagiakanmu setiap hari</li>
            <li>💕 Setia menemani dalam suka dan duka</li>
          </ul>
        </motion.div>
      );
    }

    if (step < confessionSteps.length) {
      return (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <h2 className="text-2xl font-bold text-rose-500">
            {confessionSteps[step].title}
          </h2>
          <p className="text-gray-700 text-lg">
            {confessionSteps[step].content}
          </p>
          <Button
            onClick={() => setStep(step + 1)}
            className="bg-gradient-to-r from-rose-400 to-pink-600 hover:from-rose-500 hover:to-pink-700"
          >
            Lanjut...
          </Button>
        </motion.div>
      );
    }

    return (
      <>
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-rose-400 to-pink-600 text-transparent bg-clip-text">
          <TextReveal text="Kamu mau gak jadi pacar aku?" />
        </h1>

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={handleYesClick}
            className="bg-gradient-to-r from-rose-400 to-pink-600 hover:from-rose-500 hover:to-pink-700 min-w-[100px]"
          >
            Iya
          </Button>

          <motion.div animate={noButtonControls}>
            <Button
              variant="outline"
              className="border-rose-300 min-w-[100px]"
            >
              Tidak
            </Button>
          </motion.div>
        </div>
      </>
    );
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat py-12 px-4 flex items-center justify-center"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundAttachment: 'fixed'
      }}
      onMouseMove={handleMouseMove}
    >
      {showSuccess && <FloatingHearts />}

      <div className="max-w-md w-full mx-auto">
        <Card className="shadow-lg border-pink-200 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}