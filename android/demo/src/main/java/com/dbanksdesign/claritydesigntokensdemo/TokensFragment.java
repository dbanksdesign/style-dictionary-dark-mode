package com.dbanksdesign.claritydesigntokensdemo;

import android.os.Bundle;

import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

public class TokensFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_tokens, container, false);

        CardView colorsCard = view.findViewById(R.id.colors_card_view);
        colorsCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Navigation.findNavController(view).navigate(R.id.action_navigation_tokens_to_navigation_colors);
            }
        });

        CardView paddingCard = view.findViewById(R.id.padding_card_view);
        paddingCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Navigation.findNavController(view).navigate(R.id.action_navigation_tokens_to_navigation_padding);
            }
        });

        CardView typographyCard = view.findViewById(R.id.typography_card_view);
        typographyCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Navigation.findNavController(view).navigate(R.id.action_navigation_tokens_to_navigation_typography);
            }
        });

        return view;
    }
}