import { createFullDeck, shuffleDeck } from "@/lib/Deck";
import { useMemo, useState } from "react";
// shadcn Accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DeckViewer = () => {
  const normalDeck = useMemo(() => createFullDeck(), []);
  const shuffledDeck = useMemo(() => shuffleDeck(normalDeck), [normalDeck]);

  // Track which cards are flipped (by index)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleCardFlip = (index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="p-6 space-y-8">
      <Accordion type="multiple" className="w-full space-y-4">
        {/* NORMAL DECK */}
        <AccordionItem value="normal-deck">
          <AccordionTrigger className="text-xl font-semibold">
            Normal Deck ({normalDeck.length} cards)
          </AccordionTrigger>

          <AccordionContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 p-4">
              {normalDeck.map((card, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-2 bg-white shadow rounded-lg"
                >
                  <img
                    src={card.frontFaceImage}
                    alt={card.displayName}
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <p className="text-sm mt-2">{card.displayName}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* SHUFFLED DECK */}
        <AccordionItem value="shuffled-deck">
          <AccordionTrigger className="text-xl font-semibold">
            Shuffled Deck ({shuffledDeck.length} cards)
          </AccordionTrigger>

          <AccordionContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 p-4">
              {shuffledDeck.map((card, index) => {
                const isFlipped = flippedCards.has(index);

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 bg-white shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => toggleCardFlip(index)}
                  >
                    <img
                      src={isFlipped ? card.frontFaceImage : card.backFaceImage}
                      alt={isFlipped ? card.displayName : "Card Back"}
                      width={80}
                      height={120}
                      className="rounded transition-all duration-300"
                    />
                    <p className="text-sm mt-2">
                      {isFlipped ? card.displayName : "???"}
                    </p>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DeckViewer;
