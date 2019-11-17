<script>
  import Header from "./components/Header.svelte";
  import HomePage from "./pages/HomePage.svelte";
  import DetailsPage from "./pages/DetailsPage.svelte";
  import { Router, Route } from "svelte-routing";
</script>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <Header />
  <Router>
    <Route path="">
      <HomePage />
    </Route>
    <Route path="hotel/:id" let:params>
      <DetailsPage id={params.id} />
    </Route>
  </Router>
</main>
