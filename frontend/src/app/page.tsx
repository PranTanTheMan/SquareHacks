import Chat from "../../components/Chat";
import ProductCart from "../../components/ProductCart";

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <Chat />
      <ProductCart />
    </main>
  );
}
