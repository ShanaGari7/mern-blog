import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="m-2 flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want free Knitting patterns?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with Yarnspiration
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.yarnspirations.com/en-row/collections/patterns?filter.p.m.global.skill_type=Knit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://media.istockphoto.com/id/480447231/photo/knitting.jpg?s=612x612&w=0&k=20&c=DO1k5rXNlTiBZXDxQzcJfB1c8ofJQifxSjtYtFysShs=" />
      </div>
    </div>
  );
}