"use client";

export default () => {
  return (
    <div className="p-8 rounded-lg border-2 flex flex-col gap-5 mb-[10px]">
      <div className="flex items-center gap-[10px]">
        <img src="/doctr.svg" alt="logo" className="w-7 mb-1"/>
        <div className="text-[22px] font-semibold">
          Welcome to the docTR by mindee live demo page
        </div>
      </div>
      <div className="text-[16px] leading-loose">
        Upload an image and select models out{" "}
        <a href="https://mindee.github.io/doctr" _target="_blank" className="blue-underline">
          docTR
        </a>{" "}
        leveraged by{" "}
        <a href="https://www.tensorflow.org/js" _target="_blank" className="blue-underline">
          TensorFlow.js
        </a>{" "}
        to offer end-to-end OCR services, directly in your web browser.
        <br />
        To know more about{" "}
        <a href="https://mindee.github.io/doctr" _target="_blank" className="blue-underline">
          docTR
        </a>{" "}
        check out the dedicated{" "}
        <a href="https://github.com/mindee/doctr" _target="_blank" className="blue-underline">
          Github repository.
        </a>{" "}
      </div>
    </div>
  );
};
