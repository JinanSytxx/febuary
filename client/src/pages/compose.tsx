import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/animations/FloatingHearts";
import TextReveal from "@/components/animations/TextReveal";

export default function Compose() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const noButtonControls = useAnimation();

  const handleMouseMove = async (e: React.MouseEvent) => {
    if (!showSuccess) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate new position away from mouse
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-12 px-4" onMouseMove={handleMouseMove}>
      {showSuccess && <FloatingHearts />}

      <div className="max-w-md mx-auto">
        <Card className="shadow-lg border-pink-200">
          <CardContent className="p-6 text-center">
            {!showSuccess ? (
              <>
                <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-rose-400 to-pink-600 text-transparent bg-clip-text">
                  <TextReveal text="Kamu mau gak jadi pacar aku?" />
                </h1>

                <div className="flex justify-center gap-4 mt-8 relative">
                  <Button
                    onClick={handleYesClick}
                    className="bg-gradient-to-r from-rose-400 to-pink-600 hover:from-rose-500 hover:to-pink-700 min-w-[100px]"
                  >
                    Iya
                  </Button>

                  <motion.div
                    animate={noButtonControls}
                    style={{ position: 'absolute' }}
                  >
                    <Button
                      variant="outline"
                      className="border-rose-300 min-w-[100px]"
                    >
                      Tidak
                    </Button>
                  </motion.div>
                </div>
              </>
            ) : (
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
                <ul className="text-left text-gray-600 space-y-2 mb-6">
                  <li>💝 Menyayangimu sepenuh hati</li>
                  <li>💫 Menjadi yang terbaik untukmu</li>
                  <li>🌟 Membahagiakanmu setiap hari</li>
                  <li>💕 Setia menemani dalam suka dan duka</li>
                </ul>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}