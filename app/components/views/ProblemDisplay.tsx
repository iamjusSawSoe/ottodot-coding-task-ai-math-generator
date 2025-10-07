interface ProblemDisplayProps {
  problemText: string;
  difficulty: string;
  type: string;
}

export function ProblemDisplay({
  problemText,
  difficulty,
  type,
}: ProblemDisplayProps) {
  return (
    <div className="mt-28 xxs:mt-12 xs:mt-14 text-white bg-gradient-secondary rounded-3xl shadow-lg p-6 mb-6 mx-2 xs:mx-8 md:mx-16 xl:mx-40">
      <h2 className="text-4xl text-center font-bold mb-4">Problem</h2>
      <p className="text-lg leading-relaxed mb-3">{problemText}</p>
    </div>
  );
}
