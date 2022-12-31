import { Link } from "router6-react";
import { connect } from "craq-react-redux";
import incrementAction from "../../actions/increment";

type SegmentPageProps = {
  route: any;
  some: { test: number };
  inc: () => any;
};
const SegmentPage = ({ route, some, inc }: SegmentPageProps) => (
  <div onClick={inc}>
    I am a {route.params.slug} page, {some.test}
    <Link to="segment" params={{ slug: route.params.slug + 1 }}>
      go for Model
    </Link>
  </div>
);
type Store = { test: { some: { test: number } } };
const connector = connect(
  ({ test }: Store) => test,
  (context) => ({ inc: () => context.action(incrementAction) })
);
export default connector(SegmentPage);
