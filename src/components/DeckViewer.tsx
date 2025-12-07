import { createFullDeck, shuffleDeck } from "@/lib/Deck";
import { useMemo } from "react";

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
                    src={card.asset}
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
              {shuffledDeck.map((card, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-2 bg-white shadow rounded-lg"
                >
                  <img
                    src={card.asset}
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
      </Accordion>
    </div>
  );
};

export default DeckViewer;
