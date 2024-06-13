import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="m-2 flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to create your own grid patterns for knitting? </h2>
        <p className="text-gray-500 my-2">
        Design your grid patterns and download them for further user !
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <Link to="/grid" className="text-white">
            Go to Grid Canvas
          </Link>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://nimble-needles.com/wp-content/uploads/2020/07/intarsia-knitting.jpg" alt="Knitting" />
      </div>
    </div>
  );
}
