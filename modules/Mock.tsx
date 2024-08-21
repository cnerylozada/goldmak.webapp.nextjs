"use client";
export const Mock = () => {
  return (
    <div>
      <button
        onClick={() => {
          (window as any).fbq.track("CompleteRegistration", {
            content_id: "12345",
            content_type: "product",
            value: 29.99,
            currency: "USD",
          });
        }}
      >
        button
      </button>
    </div>
  );
};
