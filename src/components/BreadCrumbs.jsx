import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const BreadCrumbs = () => {
  const pathname = "party/login/path/linkedin/datas";
  const paths = pathname.split("/");

  let pathSlices ="";

  return (
    <div className="breadCrumbs-link">
      {paths.map((path) => {
        pathSlices = `${pathSlices}/${path}`;

        return (
          <Link to={pathSlices} key={path} className="breadCrumb-links">
            {path}
          </Link>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
