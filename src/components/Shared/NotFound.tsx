import notFoundImage from "../../assets/404.gif";

const NotFound = () => {
  return (
    <section>
      <img src={notFoundImage} alt="notFound" className="mx-auto" />
    </section>
  );
};

export default NotFound;
