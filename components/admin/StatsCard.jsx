import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const info = [
  "List of all registered Customer",
  "List of all orders made",
  "List of all registered affiliates",
  "Total revenue from products",
];

const StatCard = ({ index, name, number }) => {
  const color = ["#7e88ef", "#f7890e", "#3fb757", "#7bcaec"];
  const icons = [<PeopleAltIcon key="1" className=" text-4xl" />];

  return (
    <div className="bg-white sm:w-4/12 w-full rounded-md flex gap-4 items-center justify-center py-8 px-8">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold" style={{ color: `${color[index]}` }}>
          {name}
        </h3>
        <p className="text-2xl font-base">{number}</p>
        <span className="text-sm text-gray-500">{info[index]}</span>
      </div>
      <div
        className="rounded-full h-16 w-16 flex items-center justify-center"
        style={{ background: "#f7fdff" }}
      >
        <PeopleAltIcon
          key="1"
          className=" text-3xl"
          style={{ color: `${color[index]}` }}
        />
      </div>
    </div>
  );
};

export default StatCard;
