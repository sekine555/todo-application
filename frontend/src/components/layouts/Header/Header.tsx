import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { FC, Fragment } from "react";

interface Props {}

const Header: FC<Props> = (props) => {
  const onClickLogout = async () => {
    // TODO: ログアウト処理
  };

  return (
    <header className="flex w-full items-center justify-between bg-blue-500 px-6 py-4">
      <Link href={"/"}>
        <p className="mr-4 cursor-pointer text-2xl font-bold text-white">
          TODOアプリケーション
        </p>
      </Link>
      <div>
        <Menu as="div" className="relative sm:inline-block">
          <Menu.Button className="p-2">
            <Image
              src={"/images/header/person.svg"}
              width={24}
              height={24}
              alt={"menu button"}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="p-2">
                <Menu.Item>
                  <Link href={"#"} className="p-2 text-sm">
                    アイテム1
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className={
                      "flex w-full rounded-md p-2 text-sm hover:bg-gray-100"
                    }
                    onClick={onClickLogout}
                  >
                    ログアウト
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
