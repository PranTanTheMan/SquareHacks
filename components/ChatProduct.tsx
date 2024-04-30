interface ProductData {
  name: string;
  description: string;
  price: number;
}

const ChatProduct: React.FC<{ data: ProductData | null }> = ({ data }) => {
    if (!data) {
        return null;
    }
  return (
    <div className="max-w-xs mx-auto overflow-hidden bg-gray-200 shadow-lg rounded-lg my-5">
      <div className="p-4">
        <h2 className="text-gray-800 text-lg font-semibold">{data.name}</h2>
        <p className="mt-2 text-gray-600 break-all">{data.description}</p>
        <div className="mt-4">
          <p className="text-gray-400">Price: ${data.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatProduct;
