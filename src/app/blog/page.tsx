"use client"
import List from '@/components/Blog/List';
import Card from '@/components/Blog/Card';
import articles from '@/public/data/articles';
import PictureViewer from "@/components/Blog/PictureViewer";
import React, {Suspense} from 'react';
import { useEventEmitter } from 'ahooks';
import { EventEmitter } from "ahooks/lib/useEventEmitter";
import Loading from "@/app/blog/loading";

const Blog = () => {
    const event$: EventEmitter<any> = useEventEmitter();
    return(
        <>
            <List>
                {articles.map((article) => (
                    <Suspense fallback={<Loading count={articles.length} />}>
                        <Card key={article.post.post_id} article={article} event$={event$} />
                    </Suspense>
                ))}
            </List>
            <PictureViewer event$={event$}></PictureViewer>
        </>
    )
}

export default Blog;