<script lang="tsx">
import { Options, Vue } from "vue-class-component";
import logo from '@/assets/logo.png'

@Options({})
export default class Home extends Vue {
  render() {
    return (
      <div class="home">
        <img alt="Vue logo" src={logo} />
        <br />
        <div>jsx demo</div>
      </div>
    );
  }
}
</script>
