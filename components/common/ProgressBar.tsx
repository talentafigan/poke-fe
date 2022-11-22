export default function CommonProgressBar(props: {
  value: string;
  color?: string;
}) {
  const { value = 80, color = "#fdcb6e" } = props;
  return (
    <div className="h-[10px] bg-gray-300 w-full flex justify-start items-start rounded-full">
      <div
        style={{
          backgroundColor: color,
          width: value + "%",
          borderRadius: "3px 3px 3px 3px",
        }}
        className="h-[10px]"
      ></div>
    </div>
  );
}
