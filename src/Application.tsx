import { useRouter } from "router6-react";

const NoPage = () => <div>No page</div>;

const Application = ({ context }) => {
  const { currentRoute } = useRouter();

  const PageComponent =
    context.getComponent(currentRoute.config.page, "page") || NoPage;

  return <PageComponent route={currentRoute} />;
};

export default Application;
