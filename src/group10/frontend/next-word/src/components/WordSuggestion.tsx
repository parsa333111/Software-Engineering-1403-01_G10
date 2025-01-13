'use client';

import React, { useState, useRef } from "react";
import { fetchSuggestions } from "@/app/api/suggest";

const SuggestionBox: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInputChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const lastWord = value.split(/\s+/).pop(); // Get the last word
        if (lastWord) {
            const fetchedSuggestions = await fetchSuggestions(lastWord);
            setSuggestions(fetchedSuggestions);
            setActiveIndex(null); // Reset active index
        } else {
            setSuggestions([]);
            setActiveIndex(null); // Reset active index
        }
    };

    const handleKeyUp = () => {
        if (textAreaRef.current) {
            const textarea = textAreaRef.current;
            const { selectionStart } = textarea;

            // Create a hidden mirror div to calculate cursor position
            const hiddenDiv = document.createElement("div");
            const style = getComputedStyle(textarea);

            // Copy textarea styles to the hidden div
            hiddenDiv.style.position = "absolute";
            hiddenDiv.style.visibility = "hidden";
            hiddenDiv.style.whiteSpace = "pre-wrap";
            hiddenDiv.style.wordWrap = "break-word";
            hiddenDiv.style.font = style.font;
            hiddenDiv.style.padding = style.padding;
            hiddenDiv.style.lineHeight = style.lineHeight;
            hiddenDiv.style.width = `${textarea.clientWidth}px`;

            // Add content up to the cursor
            hiddenDiv.textContent = textarea.value.substring(0, selectionStart).replace(/\n/g, "\u200B\n");

            document.body.appendChild(hiddenDiv);

            // Calculate cursor position
            const caretSpan = document.createElement("span");
            caretSpan.textContent = "|"; // Temporary caret
            hiddenDiv.appendChild(caretSpan);

            const caretRect = caretSpan.getBoundingClientRect();
            const textareaRect = textarea.getBoundingClientRect();

            setPosition({
                top: caretRect.width - hiddenDiv.scrollTop + textarea.scrollTop + 5, // Adjust vertical offset
                left: caretRect.left - hiddenDiv.scrollLeft + textareaRect.left + 5, // Adjust horizontal offset
            });

            document.body.removeChild(hiddenDiv);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (suggestions.length > 0) {
            if (e.key === "ArrowDown") {
                setActiveIndex((prev) => (prev === null || prev === suggestions.length - 1 ? 0 : prev + 1));
                e.preventDefault();
            } else if (e.key === "ArrowUp") {
                setActiveIndex((prev) => (prev === null || prev === 0 ? suggestions.length - 1 : prev - 1));
                e.preventDefault();
            } else if (e.key === "Enter" && activeIndex !== null) {
                handleSuggestionClick(suggestions[activeIndex]);
                e.preventDefault();
            } else if (e.key === "Escape") {
                setSuggestions([]);
                setActiveIndex(null);
            }
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        const words = inputValue.split(/\s+/);
        words.pop(); // Remove the last word
        const newValue = [...words, suggestion].join(" ");
        setInputValue(newValue + " ");
        setSuggestions([]);
        setActiveIndex(null); // Reset active index
    };

    const handleFetchSuggestionsManually = async () => {
        const lastWord = inputValue.split(/\s+/).pop(); // Get the last word
        if (lastWord) {
            const fetchedSuggestions = await fetchSuggestions(lastWord);
            setSuggestions(fetchedSuggestions);
            setActiveIndex(null); // Reset active index
        }
    };

    return (
        <div className="relative">
            <div className="flex justify-end">
                <button
                    onClick={handleFetchSuggestionsManually}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2 hover:bg-blue-600 focus:outline-none"
                >
                    Suggestion Words
                </button>
            </div>
            <textarea
                ref={textAreaRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                className="w-full h-40 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type something..."
            ></textarea>
            {suggestions.length > 0 && position && (
                <ul
                    style={{
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                        zIndex: 1000,
                    }}
                    className="border border-gray-300 rounded-lg bg-white shadow-lg w-64"
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className={`px-4 py-2 cursor-pointer ${
                                activeIndex === index ? "bg-blue-100" : "hover:bg-blue-50"
                            }`}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SuggestionBox;