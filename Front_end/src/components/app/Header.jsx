export default function Header() {
  return (
    <header className="h-20 bg-white p-2 border-b-1rounded-b-md shadow-md flex justify-end">
      <div className="flex gap-2 items-center">
        <div className="text-right">
          <p className="text-lg text-primary-500">Username</p>
          <p className="text-base hover:font-bold cursor-pointer transition-all">
            Đăng xuất
          </p>
        </div>
        <div className="bg-black w-12 h-12 rounded-full border-1">
          <img
            src="/logo-social.png"
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
