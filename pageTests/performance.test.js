import { getServerSideProps } from "../pages/performance";

// TODO: This needs to be moved once the verifyToken logic is in the container..
jest.mock("../src/usecases/adminIsAuthenticated", () => () => (token) =>
  token && { admin: true }
);

describe("/performance", () => {
  const anonymousReq = {
    headers: {
      cookie: "",
    },
  };

  const authenticatedReq = {
    headers: {
      cookie: "token=123",
    },
  };

  let res;

  beforeEach(() => {
    res = {
      writeHead: jest.fn().mockReturnValue({ end: () => {} }),
    };
  });

  describe("getServerSideProps", () => {
    it("Redirects to the login page if not authenticated", async () => {
      await getServerSideProps({ req: anonymousReq, res });

      expect(res.writeHead).toHaveBeenCalledWith(302, {
        Location: "/wards/login",
      });
    });

    it("Provides the current visit totals as props", async () => {
      const wardVisitTotalSpy = jest.fn(() => ({ total: 30 }));
      const container = {
        getRetrieveWardVisitTotals: () => wardVisitTotalSpy,
      };
      const { props } = await getServerSideProps({
        req: authenticatedReq,
        res,
        query: {},
        container,
      });

      expect(props).toEqual({ visitsScheduled: 30 });
    });
  });
});