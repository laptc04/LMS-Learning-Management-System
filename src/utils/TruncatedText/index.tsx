import React from 'react';

interface TruncatedTextProps {
  text: string;
  maxLength: number; // Maximum characters to display before truncation
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength }) => {
  // If text is shorter than maxLength, no need to truncate
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  // Truncate text and add ellipsis
  const truncatedText = `${text.slice(0, maxLength)}...`;

  return (
    <span title={text} className="cursor-pointer">
      {truncatedText}
    </span>
  );
};

export default TruncatedText;