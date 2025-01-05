import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">
            CLICK <span className="text-orange-500">BUY</span>
          </h2>
          <p className="mt-4 text-gray-400">
            เราจำหน่ายอุปกรณ์คอมพิวเตอร์ อุปกรณ์เกมมิ่งเกียร์ อุปกรณ์ ไอทีต่างๆ
            ถ้าคุณ มาเลือกซื้อของไอที คุณมาถูกเว็บแล้ว
          </p>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">เกี่ยวกับเรา</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61569353017911"
                className="hover:text-white"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.instagram.com/clickbuyecom/?next=%2F"
                className="hover:text-white"
              >
                Instragram
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Services Section
        <div>
          <h3 className="text-lg font-semibold mb-4">บริการลูกค้า</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                การจัดส่งสินค้า
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                การรับประกันสินค้า
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                การยกเลิกการสั่งซื้อสินค้า
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                การคืนสินค้าและการคืนเงิน
              </a>
            </li>
          </ul>
        </div> */}

        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ติดต่อเรา</h3>
          <p className="text-gray-400">17/19 ม.6 ชลบุรี บางพระ ศรีราชา 20110</p>
          <p className="mt-2 text-gray-400">โทรศัพท์: 081-038-6756</p>
          <p className="mt-2 text-gray-400">อีเมล: nicekave47@gmail.com</p>
          <div className="flex space-x-4 mt-4">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61569353017911"
              className="hover:text-red-500"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/clickbuyecom/?next=%2F"
              className="hover:text-pink-500"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        Copyright © 2024{" "}
        <a href="https://clickbuy-web.vercel.app/" className="hover:text-white">
          Clickbuy-web
        </a>{" "}
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
