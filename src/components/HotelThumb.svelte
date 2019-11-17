<script>
    import DomPurify from 'dompurify';
    import Text from '../text';
    
    export let data;

    const _address = data.address.split(',');
    const _addressLen = _address.length;
    const shortAddress = [_address[_addressLen-2], _address[_addressLen-1]].join(',');
</script>

<h3>{data.name}</h3>
<p>
    {Text.usd}{data.price} &mdash;
    {data.rating}/10 {Text.reviewRaiting} &mdash; 
    {data.stars}/5 {Text.starRating}
</p>
<p>{shortAddress}</p>