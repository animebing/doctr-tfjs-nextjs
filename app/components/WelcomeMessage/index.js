"use client";

export default () => {
  return (
    <div className="p-2 rounded-sm border-2 flex flex-col gap-5 mb-[10px] lg:p-8 lg:rounded-lg">
      <div className="flex items-center gap-[10px]">
        <img src="/doctr.svg" alt="logo" className="w-7 mb-1"/>
        <div className="text-base lg:text-2xl font-semibold">
          Welcome to the docTR by mindee live demo page
        </div>
      </div>
      <div className="text-xs lg:text-base leading-loose">
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
