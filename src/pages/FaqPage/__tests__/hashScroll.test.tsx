// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";

const useLocationMock = vi.fn();
var scrollToMock: any;

vi.mock("react-router", () => ({
  Link: ({ children }: any) => <a>{children}</a>,
  useLocation: () => useLocationMock(),
}));

vi.mock("react-scroll", () => {
  scrollToMock = vi.fn();
  return {
    scroller: { scrollTo: scrollToMock },
    Link: ({ children }: any) => <a>{children}</a>,
  };
});

vi.mock("@/aaLogic/getPlotPrice", () => ({
  getPlotPrice: () => ({ fee: 0 }),
}));
vi.mock("@/components/layout/page-layout", () => ({
  PageLayout: ({ children }: any) => <div>{children}</div>,
}));
vi.mock("@/lib", () => ({
  toLocalString: (v: any) => String(v),
}));
vi.mock("@/store/aa-store", () => ({
  useAaParams: () => ({
    matching_probability: 0,
    referral_boost: 0,
    followup_reward_share: 0,
    p2p_sale_fee: 0,
    shortcode_sale_fee: 0,
  }),
}));
vi.mock("@/store/settings-store", () => ({
  useSettingsStore: () => ({ symbol: "TOKEN" }),
}));
vi.mock("@/pages/FaqPage/components", () => ({
  FaqContent: ({ children }: any) => <div>{children}</div>,
  FaqItem: ({ children }: any) => <div>{children}</div>,
  FaqTitle: ({ children }: any) => <div>{children}</div>,
}));

import FaqPage from "../FaqPage";
import { FaqTitle } from "../components/FaqTitle";

describe("FAQ hash scrolling", () => {
  const originalQuery = document.querySelector;

  afterEach(() => {
    document.querySelector = originalQuery;
    vi.restoreAllMocks();
  });

  it("scrolls to hash with header offset", () => {
    useLocationMock.mockReturnValue({ hash: "#who-is-the-mayor", key: "1" });
    document.querySelector = vi.fn().mockReturnValue({
      getBoundingClientRect: () => ({ height: 80 }),
    }) as any;

    render(<FaqPage />);

    expect(scrollToMock).toHaveBeenCalledWith(
      "who-is-the-mayor",
      expect.objectContaining({ offset: -80 })
    );
  });

  it("does not scroll when hash is empty", () => {
    useLocationMock.mockReturnValue({ hash: "", key: "2" });
    document.querySelector = vi.fn().mockReturnValue({
      getBoundingClientRect: () => ({ height: 50 }),
    }) as any;

    render(<FaqPage />);

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("FaqTitle uses header height for offset", () => {
    document.querySelector = vi.fn().mockReturnValue({
      getBoundingClientRect: () => ({ height: 100 }),
    }) as any;

    const el = FaqTitle({ scrollId: "test", children: "Title" });
    expect(el.props.offset).toBe(-100);
    expect(el.props.to).toBe("test");
  });
});
