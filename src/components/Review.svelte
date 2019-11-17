<script>
    import Text from '../text';

    export let review;
    export let highlight;
</script>

<div class:search-result={highlight}>
    <h3>{review.rating}/10 &mdash; {review.title}</h3>
    <p>{Text.byUserLabel} {review.user.name}, {review.user.location}</p>
    <p>{review.description}</p>
</div>

<style>
    .search-result {
        background-color: blanchedalmond;
    }
</style>