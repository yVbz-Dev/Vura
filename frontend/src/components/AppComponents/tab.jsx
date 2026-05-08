import "../../App.css";

export default function Tab(props) {
  return (
    <div onClick={props?.onClick} className="h-full">
      <p
        className="font-jetbrains text-white border-l border-r-[0.1px]
        border-white/90 h-full w-full pl-2 pr-2 text-center
        flex items-center justify-center"
      >
        {props.fileName}
      </p>
    </div>
  );
}
