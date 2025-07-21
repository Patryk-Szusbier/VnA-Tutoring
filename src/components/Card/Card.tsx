interface CardProps {
  title: string;
  message: string;
}

const Card: React.FC<CardProps> = ({ title, message }) => {
  return (
    <div
      className="
        relative 
        p-[1px] 
        rounded-2xl 
        bg-[length:200%_200%]
        bg-gradient-to-r 
          from-accent to-dark
        animate-[borderShift_4s_linear_infinite]
        mx-2 sm:mx-4
        h-full
      "
    >
      <div className="bg-grayish border rounded-2xl p-4 sm:p-6 shadow-md relative z-10 h-full flex flex-col justify-between">
        <h2 className="text-accent text-lg sm:text-xl font-semibold mb-2">
          {title}
        </h2>
        <p className="text-text2 text-sm sm:text-base">{message}</p>
      </div>
    </div>
  );
};

export default Card;
