import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthApi } from "../../api/auth.api";
import { ItemApi } from "../../api/user.api";
import CommonAvatar from "../../components/common/Avatar";
import LayoutContainer from "../../components/layout/Container";

export default function PageAccount() {
  const authApi = new AuthApi();
  const itemApi = new ItemApi();
  const [totalItem, setTotalItem] = useState(0);
  const router = useRouter();
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    fetchMe();
    fetchItem();
  }, []);
  const fetchMe = async () => {
    try {
      const resp = await authApi.fetchMe();
      setProfile(resp.data);
    } catch (error) {
      toast.error("Failed Fetch Profile , Try Again Later", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
    }
  };
  const fetchItem = async () => {
    try {
      const resp = await itemApi.get();
      setTotalItem(resp.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LayoutContainer>
      <div className="w-full grid grid-cols-12">
        <div className="col-span-6 col-start-4 rounded-lg border py-8 flex items-center justify-center flex-col">
          <div className="flex justify-center items-center flex-row">
            <CommonAvatar onPress={() => {}} />
            <div className="ml-3 flex flex-col">
              <span className="text-2xl font-[500]">{profile.fullname}</span>
              <span className="font-[400] text-gray-400">
                @{profile.username}
              </span>
            </div>
          </div>
          <div className="flex mt-4 justify-center items-center flex-col">
            <span className="text-sm font-[500]">Total Pokemon</span>
            <span
              onClick={() => router.push("/account/item")}
              className="cursor-pointer text-blue-400 font-[500]"
            >
              {totalItem}
            </span>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}
