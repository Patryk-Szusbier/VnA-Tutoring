interface CardProps {
  title: string;
  message: string;
}

const Card: React.FC<CardProps> = ({ title, message }) => {
  return (
    <div className="relative p-[2px] rounded-2xl bg-[length:200%_200%] bg-gradient-to-r from-accent to-dark animate-[borderShift_3s_linear_infinite] mx-2 sm:mx-4 lg:mx-6 h-full">
      <div className="bg-grayish rounded-[calc(1rem-2px)] p-4 md:p-6 lg:p-8 shadow-md h-full flex flex-col justify-between">
        <h2 className="text-accent text-lg md:text-xl lg:text-2xl font-semibold mb-2">
          {title}
        </h2>
        <p className="text-text2 text-sm md:text-base lg:text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Card;
