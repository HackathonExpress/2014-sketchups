WebsocketTest::Application.routes.draw do
  get "board", to: "public#index"
  get "public/landing"
  root to: "public#landing"
end
