import { renderHook } from "@testing-library/react-hooks";

import useEyowoPayment from "../EyowoHooks";

const payload = {
  billId: "billId",
  email: "joshuaoluikpe@gmail.com",
  eyowoToken: "DTGFJ5N-QS84G18-NKWV9PJ-65T9Y9S",
  _callback: function () {
    console.log("hi");
  },
  onClose: function () {
    console.log("ooooooooo");
  },
};

describe("tests the eyowo hook ", () => {
  it("ensures the hook returns the right values", () => {
    const {
      result: { current },
    } = renderHook(() => useEyowoPayment(payload));

    expect(typeof current[0]).toBe("boolean");
    expect(typeof current[1]).toBe("function");
    expect(typeof current[2]).toBe("object");
  });

  it("ensures the make payment function does not return null", () => {
    // mock window object
    global.Eyowo = {
      initialize: jest.fn(),
    };
    const {
      result: { current },
    } = renderHook(() => useEyowoPayment(payload));

    expect(current[1]()).not.toBe(null);
  });
});
