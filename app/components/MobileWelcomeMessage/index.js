export default () => {
  return (
    <div className="px-6 py-5 flex flex-col">
      <div className="flex">
        <img src="/logo.svg" alt="logo" className="h-7" />
      </div>
      <div className="text-2xl font-extrabold mb-10 mt-14">
        Welcome to the docTR by mindee live demo page
      </div>
      <div className="text-lg">
        <p>
          This demo requires advanced capabilities and can’t be performed on
          mobile devices.
        </p>
        <p className="mt-5">
          Please retry the demo on a computer.
        </p>
        <p className="mt-5">
          To know more about{" "}
          <a href="https://mindee.github.io/doctr" _target="_blank" className="blue-underline">
            docTR
          </a>{" "}
          check out the dedicated{" "}
          <a href="https://github.com/mindee/doctr" _target="_blank" className="blue-underline">
            Github repository.
          </a>{" "}
        </p>
      </div>
    </div>
  );
};
