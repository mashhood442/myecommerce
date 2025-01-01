import Image from "next/image";

const Page = () => {
  return (
    <div>
      <main className="min-h-screen bg-gray-900">
      <div className="relative w-full h-screen bg-gray-800">
        <div className="relative w-full h-screen">
          <Image
            src="https://manhoos.pk/wp-content/uploads/2023/02/Polo-thumbnail.jpg"
            alt="Highlight of website"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
            <h1 className="text-4xl font-extrabold mb-4">Welcome to SwiftCart</h1>
            <p className="text-lg font-medium mb-8">
              Your one-stop online shopping destination for amazing deals and fast delivery.
            </p>
            <a href="/shirts" className="bg-blue-600 px-6 py-3 text-lg rounded-lg">
              Shop Now
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
