declare module "*.vue" {
  import { defineComponent } from "vue";

  const components: ReturnType<typeof defineComponent>;

  export default components;
}
