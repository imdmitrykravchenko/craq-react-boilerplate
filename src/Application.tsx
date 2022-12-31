import { RouterProvider, useRouter } from "router6-react";
import { Provider } from "react-redux";
import { Context } from "craq";
import { ComponentContextProvider } from "craq-react-renderer";

const NoPage = () => <div>No page</div>;

const App = ({ context }) => {
  const { currentRoute } = useRouter();

  const PageComponent =
    context.getComponent(currentRoute.config.page, "page") || NoPage;

  return <PageComponent route={currentRoute} />;
};

const Application = ({ context }: { context: Context<any> }) => (
  <RouterProvider router={context.router}>
    <ComponentContextProvider value={context.componentContext}>
      <Provider store={context.getStore()}>
        <App context={context} />
      </Provider>
    </ComponentContextProvider>
  </RouterProvider>
);

export default Application;
