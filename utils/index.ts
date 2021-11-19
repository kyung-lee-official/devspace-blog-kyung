const sortByDate = (a: any, b: any) => {
	return <any>new Date(b.frontmatter.date) - <any>new Date(a.frontmatter.date)
}

export default sortByDate

