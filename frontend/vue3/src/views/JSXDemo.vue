<script lang="tsx">
import { Options, Vue } from "vue-class-component";

@Options
export default class Home extends Vue {
  render() {
    return (
      <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <br />
        <div>jsx demo</div>
      </div>
    );
  }
}
</script>
