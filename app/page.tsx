import Link from "next/link";

export default function Home() {
  const products = [
    { name: "Matchai", image: "https://via.placeholder.com/150", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { name: "Product 2", image: "https://via.placeholder.com/150", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { name: "Product 3", image: "https://via.placeholder.com/150", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { name: "Product 4", image: "https://via.placeholder.com/150", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
  ];
  return (
    <div>
      {/* header */}
      <header className="flex justify-between items-center border-1 py-5 sticky top-0">
        <div>
          <h1 className="text-gray-600 ml-10">Logo</h1>
        </div>
        <div className="flex justify-between items-center gap-4 mr-10">
          <button className="text-gray-600 font-bold text-xl cursor-pointer">
            <Link href="#about">About</Link>
          </button>
          <button className="text-gray-600 font-bold text-xl cursor-pointer">
            <Link href="#blog">Blog</Link>
          </button>
          <button className="text-gray-600 font-bold text-xl cursor-pointer">
            <Link href="#products">Products</Link>
          </button>
        </div>

      </header>
      {/* main */}
      <main className="flex flex-col justify-between min-h-screen pt-20">
        {/* about */}
        <div id="about" className="text-gray-600 text-4xl mb-6">About</div>

        {/* blog */}
        <div id="blog">
          <h1 className="text-gray-600 text-4xl mb-6">Blog</h1>
          <div className="grid grid-cols-3 gap-7 px-4 aspect-video">
            <div className="bg-gray-200">
              <h1 className="text-gray-600">Blog</h1>
            </div>
            <div className="bg-gray-200">
              <h1 className="text-gray-600">Blog</h1>
            </div>
            <div className="bg-gray-200">
              <h1 className="text-gray-600">Blog</h1>
            </div>
            <div className="bg-gray-200">
              <h1 className="text-gray-600">Blog</h1>
            </div>
          </div>
        </div>

        {/* products */}
        <div id="products">
          <h1 className="text-gray-600 text-4xl mb-6">Product</h1>
          <div className="grid grid-cols-3 gap-7 px-4 aspect-video">
            {products.map((product) => (
              <div key={product.name} className="bg-gray-200">
                <h1 className="text-gray-600">{product.name}</h1>
                <p className="text-gray-600">{product.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="flex justify-between items-center h-20">
        <h1 className="text-gray-600">Footer</h1>
      </footer>
    </div>
  );
}
