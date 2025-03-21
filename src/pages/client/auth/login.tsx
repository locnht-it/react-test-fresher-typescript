import { loginAPI } from "@/services/api";
import { App, Button, Divider, Form, FormProps, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

type FieldType = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const { message, notification } = App.useApp();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);

    const { username, password } = values;
    const res = await loginAPI(username, password);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      message.success("Đăng nhập tài khoản thành công!");
      navigate("/");
    } else {
      notification.error({
        message: "Đăng nhập thất bại!",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
      });
    }

    setIsSubmit(false);
  };

  return (
    <div className="register-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng nhập tài khoản</h2>
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
                label="Email"
                name="username"
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

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal" style={{ textAlign: "center" }}>
                Chưa có tài khoản?
                <span>
                  <Link to="/register"> Đăng ký tại đây</Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
