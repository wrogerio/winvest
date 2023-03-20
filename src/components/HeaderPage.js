import { formatCurrency, numberWith2Caracters } from "@/helper/util";
import Link from "next/link";

const HeaderPage = (props) => {
  const { title, pageType, textBt, iconBt, accessKey, lenght, total } = props;
  let buttomClass = "";
  let buttomText = "";
  let titleFormat = "";
  let redirect = "";
  let linkToGo = "";

  switch (pageType) {
    case "cadastrar":
      buttomClass = "btn btn-sm btn-outline-primary";
      titleFormat = "mb-2 text-primary";
      linkToGo = "/" + title.toLowerCase() + "/"
      break;
    case "index":
      buttomClass = "btn btn-sm btn-outline-primary";
      titleFormat = "mb-2 text-primary";
      linkToGo = "/" + title.toLowerCase() + "/add-or-edit/0"
      break;
    case "remover":
      buttomClass = "btn btn-sm btn-outline-danger";
      titleFormat = "mb-2 text-danger";
      linkToGo = "/" + title.toLowerCase() + "/"
      break;
    case "alterar":
      buttomClass = "btn btn-sm btn-outline-warning";
      titleFormat = "mb-2 text-warning";
      linkToGo = "/" + title.toLowerCase() + "/"
      break;
  }

  return (
    <div className="row mb-2">
      <div className="col">
        <div className="headerPageBg py-2 px-3">
          <div className="d-flex justify-content-between align-items-center">
            {
              lenght && lenght != undefined ? <h4 className={titleFormat}>{title} - {numberWith2Caracters(lenght)}</h4> : <h4 className={titleFormat}>{title}</h4>
            }

            {
              total && total != undefined ? <h4 className={titleFormat}>{formatCurrency(total)}</h4> : ""
            }

            <Link href={linkToGo} className={buttomClass} accessKey={accessKey}>
              <i className={iconBt}></i>
              {textBt}
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default HeaderPage;
