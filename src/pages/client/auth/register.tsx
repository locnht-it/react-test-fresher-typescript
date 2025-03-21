import { Button, Divider, Form, FormProps, Input } from "antd";
import "./register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginAPI } from "@/services/api";

type FieldType = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    const res = await loginAPI("user@gmail.com", "1234567");
    console.log(`>>> Check res: `, res);
  };

  return (
    <div className="register-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng ký tài khoản</h2>
              <Divider />
            </div>
            <Form
              form={form}
              name="form-register"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Họ và tên"
                name="fullName"
                rules={[
                  { required: true, message: "Họ và tên không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email không được để trống!",
                  },
                  { type: "email", message: "Email không đúng định dạng!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng ký
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal" style={{ textAlign: "center" }}>
                Đã có tài khoản?
                <span>
                  <Link to="/login"> Đăng nhập</Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
